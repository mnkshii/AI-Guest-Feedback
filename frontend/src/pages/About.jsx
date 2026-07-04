import {
  Target,
  Cpu,
  BarChart3,
  CheckCircle,
  Users,
  Rocket,
} from "lucide-react";

function About() {
  return (
    <section className="about-container">

      <div className="section-title">

        <span>About Us</span>

        <h2>AI-Powered Guest Feedback Analysis</h2>

        <p>
          Transform hotel guest reviews into actionable insights using
          Artificial Intelligence, Natural Language Processing and
          real-time analytics.
        </p>

      </div>

      <div className="features-grid">

        <div className="feature-card">

          <div className="feature-icon">
            <Target />
          </div>

          <h3>Our Mission</h3>

          <p>
            We help hotels understand guest experiences by converting
            thousands of reviews into meaningful insights that improve
            customer satisfaction and business performance.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">
            <Cpu />
          </div>

          <h3>How It Works</h3>

          <p>
            Our AI models perform sentiment analysis, keyword extraction,
            review summarization and intelligent response generation in
            just a few seconds.
          </p>

        </div>

        <div className="feature-card">

          <div className="feature-icon">
            <BarChart3 />
          </div>

          <h3>Why Choose Us</h3>

          <ul className="about-list">

            <li><CheckCircle size={18}/> Real-time Sentiment Analysis</li>

            <li><CheckCircle size={18}/> AI Response Generator</li>

            <li><CheckCircle size={18}/> Interactive Dashboard</li>

            <li><CheckCircle size={18}/> Multi-language Support</li>

            <li><CheckCircle size={18}/> Export Reports</li>

          </ul>

        </div>

      </div>

      <section className="team-section">

        <div className="section-title">

          <span>Technology</span>

          <h2>
            <Users size={34}/>
            &nbsp;Built With Modern Technologies
          </h2>

          <p>
            We combine Artificial Intelligence with modern web
            technologies to create a fast, reliable and intelligent
            guest feedback platform.
          </p>

        </div>

        <div className="tech-stack">

          <span>React</span>

          <span>Node.js</span>

          <span>Express</span>

          <span>MongoDB</span>

          <span>Python</span>

          <span>OpenAI API</span>

        </div>

      </section>

      <section className="cta">

        <div className="cta-box">

          <h2>Ready to Improve Guest Satisfaction?</h2>

          <p>
            Discover how Artificial Intelligence can help you understand
            customer feedback and improve hotel experiences.
          </p>

          <button
            className="btn btn-primary"
            onClick={() => alert("Coming Soon!")}
          >
            <Rocket size={18}/>
            &nbsp;Get Started
          </button>

        </div>

      </section>

    </section>
  );
}

export default About;