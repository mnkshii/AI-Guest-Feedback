const About = () => {
  return (
    <div className="about-container">
      <div className="about-header">
        <div className="badge">
          <i className="fas fa-info-circle"></i> About Us
        </div>
        <h1>AI-Powered Guest Feedback Analysis</h1>
        <p>Transforming hotel reviews into actionable insights using cutting-edge artificial intelligence.</p>
      </div>

      <div className="about-content">
        <div className="about-card">
          <i className="fas fa-bullseye"></i>
          <h2>Our Mission</h2>
          <p>
            To empower hotels and hospitality businesses with real-time, AI-driven feedback analysis
            that turns guest reviews into strategic advantages. We believe every review holds valuable
            insights – and we make them accessible instantly.
          </p>
        </div>

        <div className="about-card">
          <i className="fas fa-microchip"></i>
          <h2>How It Works</h2>
          <p>
            Our advanced NLP models analyze thousands of reviews in seconds, detecting sentiment,
            extracting key topics (like "cleanliness", "service", "location"), and generating
            personalized AI responses – saving hours of manual work.
          </p>
        </div>

        <div className="about-card">
          <i className="fas fa-chart-simple"></i>
          <h2>Why Choose Us</h2>
          <ul className="about-list">
            <li><i className="fas fa-check-circle"></i> Real-time sentiment analysis</li>
            <li><i className="fas fa-check-circle"></i> Multi-language support</li>
            <li><i className="fas fa-check-circle"></i> Customizable dashboards</li>
            <li><i className="fas fa-check-circle"></i> AI-generated response drafts</li>
            <li><i className="fas fa-check-circle"></i> Export reports in one click</li>
          </ul>
        </div>
      </div>

      <div className="team-section">
        <h2><i className="fas fa-users"></i> Built With Passion</h2>
        <p>
          We're a team of AI engineers, UX designers, and hospitality experts dedicated to making
          guest feedback management effortless and insightful.
        </p>
        <div className="tech-stack">
          <span>React</span>
          <span>Node.js</span>
          <span>Python</span>
          <span>OpenAI API</span>
          <span>MongoDB</span>
        </div>
      </div>

      <div className="about-cta">
        <h3>Ready to transform your guest reviews?</h3>
        <button className="btn-glow" onClick={() => alert('Sign up feature coming soon!')}>
          <i className="fas fa-rocket"></i> Get Started Today
        </button>
      </div>
    </div>
  );
};

export default About;