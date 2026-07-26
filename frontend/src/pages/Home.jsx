import Hero from "../components/Hero";
import { Brain, MessageSquareText, BarChart3, Star } from "lucide-react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Hero />

      {/* Stats */}
      <section className="stats">
        <div className="section-title">
          <span>Trusted Worldwide</span>
          <h2>Powering Smarter Guest Experiences</h2>
          <p>
            Hotels use our AI platform to understand guest feedback,
            improve service quality, and increase customer satisfaction.
          </p>
        </div>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon"><BarChart3 /></div>
            <h2>50K+</h2>
            <p>Reviews analyzed every month</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Brain /></div>
            <h2>98%</h2>
            <p>AI sentiment accuracy</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><MessageSquareText /></div>
            <h2>500+</h2>
            <p>Hotels using our platform</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><Star /></div>
            <h2>4.9</h2>
            <p>Average customer rating</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="section-title">
          <span>Features</span>
          <h2>Everything You Need</h2>
          <p>Advanced AI tools designed specifically for hotel guest feedback analysis.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon"><Brain /></div>
            <h3>Sentiment Analysis</h3>
            <p>Automatically classify guest reviews into positive, neutral and negative sentiment using Artificial Intelligence.</p>
            <span className="feature-link">Learn More →</span>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><MessageSquareText /></div>
            <h3>Keyword Extraction</h3>
            <p>Discover recurring issues like cleanliness, breakfast quality, staff behaviour and amenities.</p>
            <span className="feature-link">Learn More →</span>
          </div>
          <div className="feature-card">
            <div className="feature-icon"><BarChart3 /></div>
            <h3>Interactive Dashboard</h3>
            <p>Visualize review trends, ratings and AI insights through beautiful charts and analytics.</p>
            <span className="feature-link">Learn More →</span>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-title">
          <span>Testimonials</span>
          <h2>What Hotels Say</h2>
        </div>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"This platform helped us identify recurring guest complaints within days. Service quality improved significantly."</p>
            <div className="client">
              <div className="client-avatar"></div>
              <div>
                <strong>Hotel Manager</strong>
                <p>Luxury Resort</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"The AI summaries save hours of manual review reading every week."</p>
            <div className="client">
              <div className="client-avatar"></div>
              <div>
                <strong>Operations Head</strong>
                <p>Business Hotel</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">★★★★★</div>
            <p>"Beautiful dashboard and extremely accurate sentiment detection."</p>
            <div className="client">
              <div className="client-avatar"></div>
              <div>
                <strong>General Manager</strong>
                <p>Boutique Hotel</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="cta-box">
          <h2>Ready to Transform Guest Feedback?</h2>
          <p>Join hundreds of hotels using Artificial Intelligence to improve customer satisfaction and boost ratings.</p>
          <Link to="/analysis" className="btn-glow">Start AI Analysis →</Link>
        </div>
      </section>
    </>
  );
}

export default Home;