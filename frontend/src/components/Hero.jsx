import { ArrowRight, Sparkles, Star } from "lucide-react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      {/* Background Blobs */}
      <div className="blob blob1"></div>
      <div className="blob blob2"></div>
      <div className="blob blob3"></div>

      {/* Left Side */}
      <div className="hero-left">
        <div className="hero-badge">
          <Sparkles size={18} />
          AI-Powered Guest Intelligence
        </div>

        <h1 className="hero-title">
          Transform Guest Reviews into
          <br />
          <span>Actionable Insights</span>
        </h1>

        <p className="hero-description">
          Analyze thousands of hotel reviews in seconds using Artificial
          Intelligence. Discover guest sentiment, identify recurring issues,
          and improve customer satisfaction with smart, real-time analytics.
        </p>

        <div className="hero-buttons">
          <Link to="/login">
            <button className="btn btn-primary">
              Get Started
              <ArrowRight size={18} style={{ marginLeft: "8px" }} />
            </button>
          </Link>
          <Link to="/dashboard">
            <button className="btn btn-outline">
              View Dashboard
            </button>
          </Link>
        </div>

        <div className="hero-stats">
          <div className="hero-stat">
            <h2>50K+</h2>
            <p>Reviews Analyzed</p>
          </div>
          <div className="hero-stat">
            <h2>98%</h2>
            <p>Sentiment Accuracy</p>
          </div>
          <div className="hero-stat">
            <h2>500+</h2>
            <p>Hotels Using AI</p>
          </div>
        </div>
      </div>

      {/* Right Side - Dashboard Preview */}
      <div className="hero-right">
        <div className="dashboard-card">
          <div className="dashboard-top">
            <h3>AI Dashboard</h3>
            <span className="live-badge">Live</span>
          </div>

          <div className="rating-box">
            <div className="rating-score">4.9</div>
            <div className="rating-stars">
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
              <Star size={18} fill="currentColor" />
            </div>
          </div>

          <div className="progress-group">
            <label>
              <span>Positive Feedback</span>
              <span>87%</span>
            </label>
            <div className="progress">
              <span style={{ width: "87%" }}></span>
            </div>
          </div>

          <div className="review-card">
            <h4>Latest Review</h4>
            <p>
              "Excellent service, beautiful rooms, and friendly staff.
              AI detected a highly positive sentiment with strong
              recommendations."
            </p>
            <div className="review-user">
              <div className="avatar"></div>
              <div>
                <strong>Sarah Johnson</strong>
                <p>Verified Guest</p>
              </div>
            </div>
          </div>

          <div className="ai-box">
            <h4>🤖 AI Insight</h4>
            <p>
              Guests consistently praise staff behaviour and room
              cleanliness. Breakfast quality is the most common
              improvement suggestion.
            </p>
          </div>
        </div>

        <div className="float-card card1">
          ⭐ +24% Guest Satisfaction
        </div>
       
        <div className="float-card card3">
          🚀 AI Updated Just Now
        </div>
      </div>
    </section>
  );
}

export default Hero;