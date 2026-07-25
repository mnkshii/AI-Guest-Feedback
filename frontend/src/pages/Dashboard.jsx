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
import "../styles/dashboard.css";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (id) => {
    setExpanded(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const API = "https://ai-guest-feedback.onrender.com";
        const token = localStorage.getItem("token");

        if (!token) {
          setError("Please login to view dashboard");
          setLoading(false);
          return;
        }

        const statsRes = await fetch(`${API}/api/reviews/stats`, {
          headers: { "Authorization": `Bearer ${token}` }
        });
        
        const reviewsRes = await fetch(`${API}/api/reviews`, {
          headers: { "Authorization": `Bearer ${token}` }
        });

        if (!statsRes.ok || !reviewsRes.ok) {
          throw new Error("Failed to fetch data");
        }

        const statsData = await statsRes.json();
        const reviewsData = await reviewsRes.json();

        setStats(statsData);
        
        const sortedReviews = [...reviewsData].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setReviews(sortedReviews.slice(0, 5));

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
        <div className="dashboard-error">
          <AlertCircle size={22} />
          <span>{error}</span>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      </div>
    );
  }

  const { total, positive, neutral, negative, avgRating } = stats || {
    total: 0,
    positive: 0,
    neutral: 0,
    negative: 0,
    avgRating: 0,
  };

  const posPct = total > 0 ? ((positive / total) * 100).toFixed(0) : 0;
  const neuPct = total > 0 ? ((neutral / total) * 100).toFixed(0) : 0;
  const negPct = total > 0 ? ((negative / total) * 100).toFixed(0) : 0;

  const getSentimentDisplay = (sentiment) => {
    if (sentiment === 'positive') {
      return <span className="sentiment-positive"><Smile size={16} /> Positive</span>;
    }
    if (sentiment === 'neutral') {
      return <span className="sentiment-neutral"><Meh size={16} /> Neutral</span>;
    }
    return <span className="sentiment-negative"><Frown size={16} /> Negative</span>;
  };

  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
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

      <div className="stats-grid">
        <div className="stat-card">
          <MessageSquare size={34} />
          <h2>{total}</h2>
          <p>Total Reviews</p>
        </div>
        <div className="stat-card positive-card">
          <Smile size={34} />
          <h2>{positive}</h2>
          <p>Positive Reviews</p>
        </div>
        <div className="stat-card neutral-card">
          <Meh size={34} />
          <h2>{neutral}</h2>
          <p>Neutral Reviews</p>
        </div>
        <div className="stat-card negative-card">
          <Frown size={34} />
          <h2>{negative}</h2>
          <p>Negative Reviews</p>
        </div>
        <div className="stat-card rating-card">
          <Star size={34} />
          <h2>{avgRating}</h2>
          <p>Average Rating</p>
        </div>
      </div>

      <div className="dashboard-card">
        <h3>Overall Sentiment</h3>
        <div className="sentiment-bar">
          <div className="bar positive" style={{ width: `${posPct}%` }}>
            {posPct > 0 && `${posPct}%`}
          </div>
          <div className="bar neutral" style={{ width: `${neuPct}%` }}>
            {neuPct > 0 && `${neuPct}%`}
          </div>
          <div className="bar negative" style={{ width: `${negPct}%` }}>
            {negPct > 0 && `${negPct}%`}
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h3>
          <Clock3 size={22} />
          Recent Reviews
        </h3>
        
        {reviews.length === 0 ? (
          <div className="empty-state">
            <p>📝 No reviews yet</p>
            <p>Add your first guest review to see it here!</p>
          </div>
        ) : (
          <div className="reviews-table-container">
            <table className="reviews-table">
              <thead>
                <tr>
                  <th>Guest</th>
                  <th>Date</th>
                  <th>Rating</th>
                  <th>Comment</th>
                  <th>AI Response</th>
                  <th>Sentiment</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review._id}>
                    <td data-label="Guest">{review.guest}</td>
                    <td data-label="Date">{formatDate(review.date)}</td>
                    <td data-label="Rating" className="rating-cell">
                    <span className="stars">{renderStars(review.rating)}</span>
                    </td>
                    <td data-label="Comment">{review.comment}</td>
                    <td data-label="AI Response">
                      {review.aiResponse ? (
                        <div className="ai-response-wrapper">
                          <p className={`ai-response-text ${expanded[review._id] ? 'expanded' : 'collapsed'}`}>
                            {review.aiResponse}
                          </p>
                          {review.aiResponse.length > 120 && (
                            <button
                              className="read-more-btn"
                              onClick={() => toggleExpand(review._id)}
                            >
                              {expanded[review._id] ? 'Read Less' : 'Read More'}
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="not-generated">Not Generated</span>
                      )}
                    </td>
                    <td data-label="Sentiment">{getSentimentDisplay(review.sentiment)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default Dashboard;