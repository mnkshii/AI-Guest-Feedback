import { useState, useEffect } from "react";
import {
  PieChart,
  MessageSquare,
  Smile,
  Meh,
  Frown,
  Star,
  Clock3,
  Loader2,
  AlertCircle,
} from "lucide-react";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const API = "https://ai-guest-feedback.onrender.com";

      const statsRes = await fetch(`${API}/api/reviews/stats`);
      const reviewsRes = await fetch(`${API}/api/reviews`);

      if (!statsRes.ok || !reviewsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const statsData = await statsRes.json();
      const reviewsData = await reviewsRes.json();

      setStats(statsData);
      setReviews(reviewsData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchDashboard();
}, []);
  if (loading) {
    return (
      <div className="dashboard-container center">
        <div className="loading-spinner">
          <Loader2 className="spin" size={40} />
          <h3>Loading Dashboard...</h3>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container center">
        <div className="login-error">
          <AlertCircle size={22} />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  const { total, positive, neutral, negative, avgRating } = stats;

  const posPct = ((positive / total) * 100).toFixed(0);
  const neuPct = ((neutral / total) * 100).toFixed(0);
  const negPct = ((negative / total) * 100).toFixed(0);

 
  const getSentimentDisplay = (sentiment) => {
    if (sentiment === 'positive') {
      return <span className="sentiment-positive"><Smile size={16} /> Positive</span>;
    }
    if (sentiment === 'neutral') {
      return <span className="sentiment-neutral"><Meh size={16} /> Neutral</span>;
    }
    return <span className="sentiment-negative"><Frown size={16} /> Negative</span>;
  };

  return (
    <section className="dashboard-container">
      <div className="dashboard-header">
        <h1>
          <PieChart size={38} />
          AI Analytics Dashboard
        </h1>
        <p>
          Monitor guest feedback, sentiment trends and hotel performance
          in real time.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card">
          <MessageSquare size={34} />
          <h2>{total}</h2>
          <p>Total Reviews</p>
        </div>
        <div className="stat-card">
          <Smile size={34} />
          <h2>{positive}</h2>
          <p>Positive Reviews</p>
        </div>
        <div className="stat-card">
          <Meh size={34} />
          <h2>{neutral}</h2>
          <p>Neutral Reviews</p>
        </div>
        <div className="stat-card">
          <Frown size={34} />
          <h2>{negative}</h2>
          <p>Negative Reviews</p>
        </div>
        <div className="stat-card">
          <Star size={34} />
          <h2>{avgRating}</h2>
          <p>Average Rating</p>
        </div>
      </div>

      {/* Sentiment Bar */}
      <div className="dashboard-card">
        <h3>Overall Sentiment</h3>
        <div className="sentiment-bar">
          <div className="bar positive" style={{ width: `${posPct}%` }}>
            {posPct}%
          </div>
          <div className="bar neutral" style={{ width: `${neuPct}%` }}>
            {neuPct}%
          </div>
          <div className="bar negative" style={{ width: `${negPct}%` }}>
            {negPct}%
          </div>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="dashboard-card">
        <h3>
          <Clock3 size={22} />
          Recent Reviews
        </h3>
        <div className="reviews-table-container">
          <table className="reviews-table">
            <thead>
              <tr>
                <th>Guest</th>
                <th>Date</th>
                <th>Rating</th>
                <th>Comment</th>
                <th>Sentiment</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.guest}</td>
                  <td>{review.date}</td>
                  <td>{"★".repeat(review.rating)}</td>
                  <td>{review.comment}</td>
                  <td>{getSentimentDisplay(review.sentiment)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;