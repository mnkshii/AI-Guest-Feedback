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
    setTimeout(() => {
      setStats({
        total: 5,
        positive: 3,
        neutral: 1,
        negative: 1,
        avgRating: 3.8
      });
      setReviews([
        { id: 1, guest: "John Doe", date: "2026-06-17", rating: 4, comment: "Great stay, very clean!", sentiment: "positive" },
        { id: 2, guest: "Jane Smith", date: "2026-06-16", rating: 4, comment: "WiFi was slow but room was nice.", sentiment: "neutral" },
        { id: 3, guest: "Alice Brown", date: "2026-06-15", rating: 3, comment: "Noisy at night, not comfortable.", sentiment: "negative" },
        { id: 4, guest: "Bob Johnson", date: "2026-06-14", rating: 5, comment: "Excellent location and friendly staff.", sentiment: "positive" },
        { id: 5, guest: "Emily Davis", date: "2026-06-13", rating: 5, comment: "Perfect stay, highly recommend!", sentiment: "positive" },
      ]);
      setLoading(false);
    }, 1000);
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

  // FIXED: Horizontal sentiment display with icon + text
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
                <tr key={review.id}>
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