import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = 'http://localhost:5000/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch stats and reviews in parallel
        const [statsRes, reviewsRes] = await Promise.all([
          fetch(`${API_BASE}/reviews/stats`),
          fetch(`${API_BASE}/reviews`)
        ]);

        if (!statsRes.ok || !reviewsRes.ok) {
          throw new Error('Failed to fetch data from server');
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

    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i> Loading dashboard...
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="login-error">
          <i className="fas fa-exclamation-circle"></i> Error: {error}
        </div>
      </div>
    );
  }

  // Data loaded
  const { total, positive, neutral, negative, avgRating } = stats;
  const posPct = ((positive / total) * 100).toFixed(0);
  const neuPct = ((neutral / total) * 100).toFixed(0);
  const negPct = ((negative / total) * 100).toFixed(0);

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1><i className="fas fa-chart-pie"></i> Dashboard</h1>
        <p>Real‑time overview of guest feedback</p>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <i className="fas fa-comments"></i>
          <div className="stat-info">
            <h3>{total}</h3>
            <p>Total Reviews</p>
          </div>
        </div>
        <div className="stat-card positive">
          <i className="fas fa-smile"></i>
          <div className="stat-info">
            <h3>{positive}</h3>
            <p>Positive</p>
          </div>
        </div>
        <div className="stat-card neutral">
          <i className="fas fa-meh"></i>
          <div className="stat-info">
            <h3>{neutral}</h3>
            <p>Neutral</p>
          </div>
        </div>
        <div className="stat-card negative">
          <i className="fas fa-frown"></i>
          <div className="stat-info">
            <h3>{negative}</h3>
            <p>Negative</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-star"></i>
          <div className="stat-info">
            <h3>{avgRating}</h3>
            <p>Avg Rating</p>
          </div>
        </div>
      </div>

      {/* Sentiment Bar */}
      <div className="sentiment-bar">
        <div className="bar positive" style={{ width: `${posPct}%` }}>👍 {posPct}%</div>
        <div className="bar neutral" style={{ width: `${neuPct}%` }}>😐 {neuPct}%</div>
        <div className="bar negative" style={{ width: `${negPct}%` }}>👎 {negPct}%</div>
      </div>

      {/* Recent Reviews Table */}
      <div className="reviews-section">
        <h2><i className="fas fa-clock"></i> Recent Reviews</h2>
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
                  <td>{'⭐'.repeat(review.rating)}</td>
                  <td>{review.comment}</td>
                  <td className={`sentiment-${review.sentiment}`}>
                    <i className={`fas fa-${review.sentiment === 'positive' ? 'smile' : review.sentiment === 'neutral' ? 'meh' : 'frown'}`}></i>
                    {review.sentiment.charAt(0).toUpperCase() + review.sentiment.slice(1)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;