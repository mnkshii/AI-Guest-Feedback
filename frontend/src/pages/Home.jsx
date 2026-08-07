import Hero from "../components/Hero";
import { Link } from "react-router-dom";
import {
  Brain,
  MessageSquareText,
  BarChart3,
  Star,
  Bot,
  Search,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import FeatureCard from "../components/FeatureCard";

function Home() {
  return (
    <>
      <Hero />

      
<section className="workflow">
  <div className="section-title">
    <span>How It Works</span>
    <h2>Turn Guest Reviews Into Actionable Insights</h2>
    <p>
      Our AI automates the review analysis process, helping hotel managers
      understand customer feedback and improve guest satisfaction.
    </p>
  </div>

  <div className="workflow-grid">

    <div className="workflow-card">
      <MessageSquareText size={42} />
      <h3>1. Collect Reviews</h3>
      <p>
        Gather guest reviews from different platforms or manually upload
        them into the dashboard.
      </p>
    </div>

    <div className="workflow-card">
      <Brain size={42} />
      <h3>2. AI Analysis</h3>
      <p>
        Detect sentiment, identify recurring issues, and extract important
        keywords automatically.
      </p>
    </div>

    <div className="workflow-card">
      <Bot size={42} />
      <h3>3. Generate AI Replies</h3>
      <p>
        Create professional and personalized responses that hotel managers
        can send directly to guests.
      </p>
    </div>

    <div className="workflow-card">
      <TrendingUp size={42} />
      <h3>4. Improve Services</h3>
      <p>
        Use AI recommendations to enhance cleanliness, food quality,
        customer service, and overall guest experience.
      </p>
    </div>

  </div>
</section>

      {/* STATS  */}
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

    <div className="features-grid">
  <FeatureCard
    icon={Brain}
    title="Sentiment Analysis"
    description="Automatically classify guest reviews into Positive, Neutral, or Negative sentiment using AI."
  />
  <FeatureCard
    icon={Search}
    title="Keyword Extraction"
    description="Detect recurring topics like cleanliness, breakfast, staff, amenities, Wi-Fi, and room service."
  />
  <FeatureCard
    icon={Bot}
    title="AI Response Generator"
    description="Generate professional, personalized responses to guest reviews in seconds."
  />
  <FeatureCard
    icon={BarChart3}
    title="Analytics Dashboard"
    description="Monitor review trends, average ratings, sentiment distribution, and AI insights through interactive charts."
  />
  <FeatureCard
    icon={TrendingUp}
    title="Improvement Suggestions"
    description="Receive AI-powered recommendations to improve hotel operations and guest satisfaction."
  />
  <FeatureCard
    icon={CheckCircle}
    title="Review Management"
    description="Store, organize, search, and manage guest reviews efficiently from a single dashboard."
  />
</div>
      {/*  TESTIMONIALS  */}
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

      {/*  CTA */}
      <section className="cta">
        <div className="cta-box">
         <h2>Ready to Make Every Guest Review Count?</h2>
          <p>
          Analyze customer feedback, generate AI-powered responses, discover
          recurring issues, and improve your hotel's service quality with one
          intelligent platform.
          </p>
          <Link to="/analysis" className="btn-glow">Start AI Analysis →</Link>
        </div>
      </section>
    </>
  );
}

export default Home;