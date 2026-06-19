import { useState } from 'react';

const Report = () => {
  // Mock data for demonstration
  const [timeframe, setTimeframe] = useState('weekly');
  const stats = {
    total: 245,
    positive: 142,
    neutral: 68,
    negative: 35,
    avgRating: 4.2,
    topThemes: ['Cleanliness', 'Service', 'Location', 'Amenities', 'Value'],
    recentTrend: [12, 18, 22, 20, 25, 30, 28] // last 7 days
  };

  const getSentimentPercentage = (count) => ((count / stats.total) * 100).toFixed(0);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1><i className="fas fa-file-alt"></i> Reports</h1>
        <p>Aggregated insights and performance metrics</p>
      </div>

      <div className="report-controls">
        <div className="btn-group">
          <button className={timeframe === 'weekly' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => setTimeframe('weekly')}>Weekly</button>
          <button className={timeframe === 'monthly' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => setTimeframe('monthly')}>Monthly</button>
          <button className={timeframe === 'yearly' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => setTimeframe('yearly')}>Yearly</button>
        </div>
        <button className="btn btn-secondary"><i className="fas fa-download"></i> Export PDF</button>
      </div>

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
            <p>Positive ({getSentimentPercentage(stats.positive)}%)</p>
          </div>
        </div>
        <div className="stat-card neutral">
          <i className="fas fa-meh"></i>
          <div className="stat-info">
            <h3>{stats.neutral}</h3>
            <p>Neutral ({getSentimentPercentage(stats.neutral)}%)</p>
          </div>
        </div>
        <div className="stat-card negative">
          <i className="fas fa-frown"></i>
          <div className="stat-info">
            <h3>{stats.negative}</h3>
            <p>Negative ({getSentimentPercentage(stats.negative)}%)</p>
          </div>
        </div>
      </div>

      <div className="report-grid">
        <div className="report-card card">
          <h3><i className="fas fa-star"></i> Average Rating</h3>
          <div className="big-number">{stats.avgRating}</div>
          <p>out of 5.0</p>
        </div>
        <div className="report-card card">
          <h3><i className="fas fa-tags"></i> Top Themes</h3>
          <ul className="theme-list">
            {stats.topThemes.map((theme, i) => (
              <li key={i}><span className="theme-bullet"></span> {theme}</li>
            ))}
          </ul>
        </div>
        <div className="report-card card full-width">
          <h3><i className="fas fa-chart-line"></i> Trend (last 7 days)</h3>
          <div className="trend-chart">
            {stats.recentTrend.map((value, i) => (
              <div key={i} className="trend-bar-container">
                <div className="trend-bar" style={{ height: `${(value / 30) * 100}%` }}></div>
                <span className="trend-label">Day {i+1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;