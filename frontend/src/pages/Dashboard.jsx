const Dashboard = () => {
  // Mock data – replace with real API data later
  const stats = {
    total: 245,
    positive: 142,
    neutral: 68,
    negative: 35,
    avgRating: 4.2
  };
  const recentReviews = [
    { id: 1, guest: 'John Doe', date: '2026-06-17', rating: 5, comment: 'Great stay, very clean!', sentiment: 'positive' },
    { id: 2, guest: 'Jane Smith', date: '2026-06-16', rating: 3, comment: 'WiFi was slow but room was nice.', sentiment: 'neutral' },
    { id: 3, guest: 'Alice Brown', date: '2026-06-15', rating: 2, comment: 'Noisy at night, not comfortable.', sentiment: 'negative' },
    { id: 4, guest: 'Bob Johnson', date: '2026-06-14', rating: 4, comment: 'Excellent location and friendly staff.', sentiment: 'positive' },
    { id: 5, guest: 'Emily Davis', date: '2026-06-13', rating: 5, comment: 'Perfect stay, highly recommend!', sentiment: 'positive' },
  ];

  // Optional: calculate percentages for the sentiment bar
  const total = stats.total;
  const posPct = ((stats.positive / total) * 100).toFixed(0);
  const neuPct = ((stats.neutral / total) * 100).toFixed(0);
  const negPct = ((stats.negative / total) * 100).toFixed(0);

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
            <h3>{stats.total}</h3>
            <p>Total Reviews</p>
          </div>
        </div>
        <div className="stat-card positive">
          <i className="fas fa-smile"></i>
          <div className="stat-info">
            <h3>{stats.positive}</h3>
            <p>Positive</p>
          </div>
        </div>
        <div className="stat-card neutral">
          <i className="fas fa-meh"></i>
          <div className="stat-info">
            <h3>{stats.neutral}</h3>
            <p>Neutral</p>
          </div>
        </div>
        <div className="stat-card negative">
          <i className="fas fa-frown"></i>
          <div className="stat-info">
            <h3>{stats.negative}</h3>
            <p>Negative</p>
          </div>
        </div>
        <div className="stat-card">
          <i className="fas fa-star"></i>
          <div className="stat-info">
            <h3>{stats.avgRating}</h3>
            <p>Avg Rating</p>
          </div>
        </div>
      </div>

      {/* Optional: Sentiment Bar */}
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
              {recentReviews.map((review) => (
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